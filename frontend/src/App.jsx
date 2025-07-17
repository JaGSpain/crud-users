import { useEffect, useState } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/api/users/local')
      .then(res => res.json())
      .then(data => {
       console.log('📦 Usuarios recibidos:', data);
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error al obtener usuarios:', err);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Usuarios desde el backend</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
