import React, { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Buscar contactos ao carregar a página
  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*')
    if (error) console.error('Erro ao buscar contactos:', error)
    else setContacts(data || [])
  }

  // Adicionar novo contacto
  async function addContact(e) {
    e.preventDefault()
    if (!name || !phone) return

    const { error } = await supabase.from('contacts').insert([{ name, phone, stage: 'Novo Lead' }])
    
    if (error) {
      alert('Erro ao guardar contacto: ' + error.message)
    } else {
      setName('')
      setPhone('')
      fetchContacts()
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>CRM Chatbot WhatsApp - Gestão de Leads</h2>

      {/* Formulário para cadastrar lead */}
      <form onSubmit={addContact} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nome do Cliente" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="text" 
          placeholder="Telemóvel (ex: 5511999999999)" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Adicionar Contacto
        </button>
      </form>

      {/* Lista de Contactos */}
      <h3>Lista de Contactos Cadastrados</h3>
      <ul>
        {contacts.map(c => (
          <li key={c.id} style={{ marginBottom: '10px' }}>
            <strong>{c.name}</strong> ({c.phone}) - Etapa: <em>{c.stage}</em>
          </li>
        ))}
      </ul>
    </div>
  )
}
