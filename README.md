# Jungle Fullstack Challenge

Nome: Filipe Marques dos Santos
- [Linkedin](https://www.linkedin.com/in/filipemarquesdeveloper/)
- [Github](https://github.com/Filipe-Santos17)

## Arquitetura (diagrama simples ASCII ou imagem)

![rabbit-fluxo](./rabbit-fluxo.png)

## Decisões técnicas e trade-offs
- Dei preferência ao desenvolvimento backend e à arquitetura de microsserviços pela necessidade de escalabilidade e separação clara de responsabilidades entre serviços.
- No frontend, usei TanStack Query para gerenciamento de dados com cache e sincronização reativa, aceitando uma curva de aprendizagem maior em troca de UX consistente e refetch controlado por cache invalidation.
- Decisão por hooks separados para cada operação de API (GET, POST, PUT, DELETE) seguindo o padrão do React Query.
- Iniciei o projeto utilizando [kanban](https://www.shadcn.io/components/data/kanban), porém devido a complexidade de manutenção, dificuldade na seleção da task após alteração, dificuldade na questão de paginação e o uso de debounce no envio de atualizações de status de tarefas para reduzir chamadas excessivas ao backend, para utilizar a latência controlada em troca de menor carga na API. Devido a tais problemas optei por fazer a troca por datatables.

## Problemas conhecidos e o que melhoraria:
- Completar a feature de filtragem de tarefas por titulo, data, status e prioridade. Qual foi ignorada devido ao prazo.

## Tempo gasto em cada parte
- Envio da Tarefa / Entrevista técnina: 04/12
- 20h estudo de Nestjs, Shadcn e Tanstack
- 16h desenvolvimento do frontend
- 30h desenvolvimento e testes no backend

## Instruções específicas:

Para iniciar o projeto:

- 1º Clone do repositorio:
```bash
git clone https://github.com/Filipe-Santos17/jungle-fullstack-challenge
cd jungle-fullstack-challenge
```


- 2° Inserção das envs de projeto:

```bash
# Insira as envs abaixo no arquivo .env nos locais especificados
# .env / (raiz do projeto - mesmo nivel do package.json)
PORT_DB=5432
HOST_DB=db
USERNAME_DB=postgres
PASSWORD_DB=password
DATABASE_DB=challenge_db

# .env apps/api-gateway
PORT=3001
NODE_ENV=production

JWT_SECRET=dhskdhkjsdhjksadj
JWT_EXPIRATION_MINUTES=15
JWT_REFRESH_EXPIRATION_DAYS=7

RABBIT_MQ_URI=amqp://admin:admin@rabbitmq:5672
RABBIT_MQ_AUTH_ENV=AUTH
RABBIT_MQ_TASKS_ENV=TASKS
RABBIT_MQ_API_GATEWAY_ENV=API_GATEWAY

# .env apps/auth-service
RABBIT_MQ_URI=amqp://admin:admin@rabbitmq:5672
RABBIT_MQ_AUTH_ENV=AUTH

JWT_SECRET=dhskdhkjsdhjksadj
JWT_EXPIRATION_MINUTES=15
JWT_REFRESH_EXPIRATION_DAYS=7
SALT_OR_ROUNDS=12

PORT_DB=5432
HOST_DB=db
USERNAME_DB=postgres
PASSWORD_DB=password
DATABASE_DB=challenge_db

# .env apps/notifications-service
RABBIT_MQ_URI=amqp://admin:admin@rabbitmq:5672
RABBIT_MQ_NOTIFICATION_ENV=NOTIFICATION
RABBIT_MQ_API_GATEWAY_ENV=API_GATEWAY

# .env apps/tasks-service
RABBIT_MQ_URI=amqp://admin:admin@rabbitmq:5672
RABBIT_MQ_TASKS_ENV=TASKS
RABBIT_MQ_NOTIFICATION_ENV=NOTIFICATION

PORT_DB=5432
HOST_DB=db
USERNAME_DB=postgres
PASSWORD_DB=password
DATABASE_DB=challenge_db

# .env web
VITE_API_ROUTE=http://localhost:3001/api
VITE_ENVIROMENT=production
VITE_PORT=5173
VITE_API_WS_ROUTE=http://localhost:3001/ws
```

- 3º Execute as migrations:
```bash
npm run migration:run
```

- 4º Execute o Docker:
```bash
sudo docker compose up -d --build
```

- 5º Acesse o [localhost:5173](http://localhost:5173/register) ou [localhost:4173](http://localhost:4173/register) para criar conta e utilizar o projeto.