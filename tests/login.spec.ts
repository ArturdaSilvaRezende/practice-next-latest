import { test, expect } from "@playwright/test";

// URL base configurada no playwright.config.ts (geralmente http://localhost:3000)
const LOGIN_URL = "/";

test.describe("Página de Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test("deve exibir erros de validação ao tentar enviar campos vazios", async ({
    page,
  }) => {
    // Aumentamos a resiliência garantindo que o scroll foi feito até o botão
    const loginButton = page.getByRole("button", { name: /login/i });

    // O force: true ignora a verificação de "estabilidade" (útil se houver animações CSS infinitas ou overlays de dev)
    await loginButton.click({ force: true });

    // Verificamos se as mensagens de erro do Yup aparecem
    await expect(page.getByText("Informe o e-mail ou username")).toBeVisible();
    await expect(page.getByText("Informe a senha")).toBeVisible();
  });

  test("deve mostrar o select de unidades ao digitar um usuário com múltiplas unidades", async ({
    page,
  }) => {
    // 1. INTERCEPTAÇÃO (Mocking): Fazemos isso ANTES da ação de digitar
    // Substitua o asterisco pelo trecho final da sua URL de unidade
    await page.route("**/auth/user-unity*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          unitys: [
            { id: 1, name: "Unidade Matriz" },
            { id: 2, name: "Unidade Filial" },
          ],
        }),
      });
    });

    // 2. Ação de digitar
    const inputUser = page.getByPlaceholder("Digite seu usuário");
    await inputUser.fill("usuario.teste"); // Pode ser qualquer nome agora, o mock vai responder

    // 3. Espera a rede confirmar que o mock foi enviado
    await page.waitForResponse((res) => res.url().includes("/auth/user-unity"));

    // 4. Verificação
    // Agora o componente DEVE aparecer porque o mock enviou 2 unidades
    const unitSelect = page.getByText("Nome da Unidade");
    await expect(unitSelect).toBeVisible({ timeout: 5000 });

    // Opcional: verificar se o texto "Unidade" (label) apareceu
    await expect(page.getByText("Unidade", { exact: true })).toBeVisible();
  });

  test("deve realizar login com sucesso e redirecionar para módulos", async ({ page }) => {
  // 1. Mock de Unidades
  await page.route('**/auth/user-unity*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ unitys: [{ id: 1, name: 'Unidade Teste' }] }),
    });
  });

  // 2. Mock do Login
  // Vamos interceptar a chamada de rede que o loginAction faz internamente
  await page.route('**/auth/login*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, token: 'fake-token' }), 
    });
  });

  await page.getByPlaceholder("Digite seu usuário").fill("artur.rezende");
  await page.getByPlaceholder("Sua senha").fill("senha1234");

  // Pequena pausa para garantir que o debounce do fetchUnits terminou e o botão habilitou
  await page.waitForTimeout(500);

  const loginButton = page.getByRole("button", { name: /login/i });
  
  // 3. Clique e verificação de URL combinados
  // Em vez de waitForURL isolado, usamos o expect com um timeout longo
  await loginButton.click();

  // O toHaveURL do Playwright é inteligente: ele fica tentando até a URL mudar ou dar timeout
  await expect(page).toHaveURL(/.*modules/, { timeout: 15000 });
});

  test("deve permitir alternar a visibilidade da senha", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("Sua senha");
    await passwordInput.fill("secret123");

    await expect(passwordInput).toHaveAttribute("type", "password");

    // Solução: Buscar o botão que está imediatamente após ou dentro do container do input de senha
    // Usaremos o seletor de posição ou um filtro mais específico
    const toggleButton = page
      .locator("button")
      .filter({ has: page.locator("svg.lucide-eye, svg.lucide-eye-off") });

    await toggleButton.click();

    await expect(passwordInput).toHaveAttribute("type", "text");
  });
});
