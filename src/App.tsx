import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";

export default function App() {
  const { getToken } = useAuth();

  const chamarJava = async () => {
    try {
      const token = await getToken(); // Pega o token JWT fresquinho do Clerk
      
      const resposta = await fetch("http://localhost:8080/v1/teste/me", {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (resposta.status === 401) {
        alert("Erro 401: O Java recusou seu token!");
        return;
      }

      const dados = await resposta.json();
      console.log("Resposta do Java:", dados);
      alert("Sucesso! O Java disse: " + dados.mensagem);
      
    } catch (error) {
      console.error("Erro na chamada:", error);
      alert("Erro ao conectar com o Back-end. O Java está rodando?");
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Haze Nexus</h1>
      <hr />
      
      <SignedOut>
        <p>Você está deslogado. Clique abaixo para entrar:</p>
        <SignInButton mode="modal">
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Entrar no Sistema</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <UserButton afterSignOutUrl="/" />
          <p>Logado com sucesso!</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={chamarJava} 
            style={{ padding: '12px 24px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Enviar Token para o Java
          </button>
        </div>
      </SignedIn>
    </div>
  );
}