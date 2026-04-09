# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Página de Login >> deve realizar login com sucesso e redirecionar para módulos
- Location: tests\login.spec.ts:59:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*modules/
Received string:  "http://localhost:3000/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    18 × unexpected value "http://localhost:3000/"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e4]:
      - img "Logo" [ref=e5]
      - generic [ref=e6]:
        - generic [ref=e7]:
          - group [ref=e8]:
            - generic [ref=e9]: E-mail ou Usuário
            - generic [ref=e10]:
              - img [ref=e11]
              - textbox "Digite seu usuário" [ref=e14]: artur.rezende
          - group [ref=e15]:
            - generic [ref=e16]: Senha
            - generic [ref=e17]:
              - img [ref=e18]
              - textbox "Sua senha" [ref=e21]: senha1234
              - button [ref=e22]:
                - img [ref=e23]
        - generic [ref=e26]:
          - button "Login" [active] [ref=e27] [cursor=pointer]
          - button "Cadastre-se" [ref=e28]
    - generic [ref=e29]:
      - img "Pessoa assinando documento em ambiente corporativo" [ref=e30]
      - generic [ref=e32]:
        - heading "Simplifique Suas Assinaturas" [level=2] [ref=e33]
        - paragraph [ref=e34]: Automação inteligente para o seu fluxo de trabalho
  - button "Open Next.js Dev Tools" [ref=e40] [cursor=pointer]:
    - img [ref=e41]
  - alert [ref=e44]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // URL base configurada no playwright.config.ts (geralmente http://localhost:3000)
  4   | const LOGIN_URL = "/";
  5   | 
  6   | test.describe("Página de Login", () => {
  7   |   test.beforeEach(async ({ page }) => {
  8   |     await page.goto(LOGIN_URL);
  9   |   });
  10  | 
  11  |   test("deve exibir erros de validação ao tentar enviar campos vazios", async ({
  12  |     page,
  13  |   }) => {
  14  |     // Aumentamos a resiliência garantindo que o scroll foi feito até o botão
  15  |     const loginButton = page.getByRole("button", { name: /login/i });
  16  | 
  17  |     // O force: true ignora a verificação de "estabilidade" (útil se houver animações CSS infinitas ou overlays de dev)
  18  |     await loginButton.click({ force: true });
  19  | 
  20  |     // Verificamos se as mensagens de erro do Yup aparecem
  21  |     await expect(page.getByText("Informe o e-mail ou username")).toBeVisible();
  22  |     await expect(page.getByText("Informe a senha")).toBeVisible();
  23  |   });
  24  | 
  25  |   test("deve mostrar o select de unidades ao digitar um usuário com múltiplas unidades", async ({
  26  |     page,
  27  |   }) => {
  28  |     // 1. INTERCEPTAÇÃO (Mocking): Fazemos isso ANTES da ação de digitar
  29  |     // Substitua o asterisco pelo trecho final da sua URL de unidade
  30  |     await page.route("**/auth/user-unity*", async (route) => {
  31  |       await route.fulfill({
  32  |         status: 200,
  33  |         contentType: "application/json",
  34  |         body: JSON.stringify({
  35  |           unitys: [
  36  |             { id: 1, name: "Unidade Matriz" },
  37  |             { id: 2, name: "Unidade Filial" },
  38  |           ],
  39  |         }),
  40  |       });
  41  |     });
  42  | 
  43  |     // 2. Ação de digitar
  44  |     const inputUser = page.getByPlaceholder("Digite seu usuário");
  45  |     await inputUser.fill("usuario.teste"); // Pode ser qualquer nome agora, o mock vai responder
  46  | 
  47  |     // 3. Espera a rede confirmar que o mock foi enviado
  48  |     await page.waitForResponse((res) => res.url().includes("/auth/user-unity"));
  49  | 
  50  |     // 4. Verificação
  51  |     // Agora o componente DEVE aparecer porque o mock enviou 2 unidades
  52  |     const unitSelect = page.getByText("Nome da Unidade");
  53  |     await expect(unitSelect).toBeVisible({ timeout: 5000 });
  54  | 
  55  |     // Opcional: verificar se o texto "Unidade" (label) apareceu
  56  |     await expect(page.getByText("Unidade", { exact: true })).toBeVisible();
  57  |   });
  58  | 
  59  |   test("deve realizar login com sucesso e redirecionar para módulos", async ({ page }) => {
  60  |   // 1. Mock de Unidades
  61  |   await page.route('**/auth/user-unity*', async (route) => {
  62  |     await route.fulfill({
  63  |       status: 200,
  64  |       contentType: 'application/json',
  65  |       body: JSON.stringify({ unitys: [{ id: 1, name: 'Unidade Teste' }] }),
  66  |     });
  67  |   });
  68  | 
  69  |   // 2. Mock do Login
  70  |   // Vamos interceptar a chamada de rede que o loginAction faz internamente
  71  |   await page.route('**/auth/login*', async (route) => {
  72  |     await route.fulfill({
  73  |       status: 200,
  74  |       contentType: 'application/json',
  75  |       body: JSON.stringify({ success: true, token: 'fake-token' }), 
  76  |     });
  77  |   });
  78  | 
  79  |   await page.getByPlaceholder("Digite seu usuário").fill("artur.rezende");
  80  |   await page.getByPlaceholder("Sua senha").fill("senha1234");
  81  | 
  82  |   // Pequena pausa para garantir que o debounce do fetchUnits terminou e o botão habilitou
  83  |   await page.waitForTimeout(500);
  84  | 
  85  |   const loginButton = page.getByRole("button", { name: /login/i });
  86  |   
  87  |   // 3. Clique e verificação de URL combinados
  88  |   // Em vez de waitForURL isolado, usamos o expect com um timeout longo
  89  |   await loginButton.click();
  90  | 
  91  |   // O toHaveURL do Playwright é inteligente: ele fica tentando até a URL mudar ou dar timeout
> 92  |   await expect(page).toHaveURL(/.*modules/, { timeout: 15000 });
      |                      ^ Error: expect(page).toHaveURL(expected) failed
  93  | });
  94  | 
  95  |   test("deve permitir alternar a visibilidade da senha", async ({ page }) => {
  96  |     const passwordInput = page.getByPlaceholder("Sua senha");
  97  |     await passwordInput.fill("secret123");
  98  | 
  99  |     await expect(passwordInput).toHaveAttribute("type", "password");
  100 | 
  101 |     // Solução: Buscar o botão que está imediatamente após ou dentro do container do input de senha
  102 |     // Usaremos o seletor de posição ou um filtro mais específico
  103 |     const toggleButton = page
  104 |       .locator("button")
  105 |       .filter({ has: page.locator("svg.lucide-eye, svg.lucide-eye-off") });
  106 | 
  107 |     await toggleButton.click();
  108 | 
  109 |     await expect(passwordInput).toHaveAttribute("type", "text");
  110 |   });
  111 | });
  112 | 
```