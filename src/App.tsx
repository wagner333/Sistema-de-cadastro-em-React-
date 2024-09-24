import React, { useState } from 'react';
import { ChakraProvider, Box, Stack, Heading, Text, Button, Input, FormControl, FormLabel, Image, Flex, Alert } from '@chakra-ui/react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cadastro realizado:', { name, email, password });

    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      setMessage({ text: 'Erro ao se conectar com a API.', type: 'error' });
    });

    // Limpar os campos após o envio
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <ChakraProvider>
      <Box bgGradient="linear(to-r, teal.500, teal.300)" minHeight="100vh" padding="20px">
        <Flex as="header" align="center" justify="space-between" padding="20px">
          <Image 
            src="https://media.discordapp.net/attachments/1269376470296428656/1288180499105452084/logo.png?ex=66f43f14&is=66f2ed94&hm=1df866a5fdb3d0dc293d1f46993ef3eb7f7bb6728d7472ecd64d0f4c5b3057e8&=&format=webp&quality=lossless" 
            alt="Logo" 
            width="200px" 
            objectFit="contain" 
          />
          <Stack direction="row" spacing={4}>
            <Button variant="link" color="white">Home</Button>
            <Button variant="link" color="white">Sobre</Button>
            <Button variant="link" color="white">Contato</Button>
          </Stack>
        </Flex>

        {/* Mensagem de feedback */}
        {message.text && (
          <Alert status={message.type === 'success' ? 'success' : 'error'} marginBottom="20px">
            {message.text}
          </Alert>
        )}

        {/* Main */}
        <Flex justify="center" align="center" height="80vh">
          <Box bg="white" borderRadius="lg" boxShadow="lg" padding="40px" width={{ base: '90%', sm: '400px' }}>
            <Heading as="h2" size="xl" marginBottom="10px">Crie sua Conta</Heading>
            <Text fontSize="lg" marginBottom="20px">
              Preencha os campos abaixo para se cadastrar.
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="name" marginBottom="15px" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input 
                  name="name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Digite seu nome" 
                />
              </FormControl>
              <FormControl id="email" marginBottom="15px" isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input 
                  name="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Digite seu e-mail" 
                />
              </FormControl>
              <FormControl id="password" marginBottom="15px" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input 
                  name="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Digite sua senha" 
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" width="full">Cadastrar</Button>
            </form>
          </Box>
        </Flex>

        {/* Footer */}
        <Box as="footer" bg="teal.500" color="white" padding="10px" textAlign="center">
          <Text>© 2024 Minha Página de Cadastro. Todos os direitos reservados.</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
