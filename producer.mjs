import amqp from 'amqplib'

async function main() {
  const connection = await amqp.connect({
    hostname: 'localhost',
    port: 5672,
    username: 'rabbitmq',
    password: 'curso'
  })

  const channel = await connection.createChannel()

  await channel.assertQueue('minha_fila', {
    durable: true,
  })

  await channel.publish('','minha_fila', Buffer.from("Minha mensagem!"))
  await channel.publish('', 'minha_fila', Buffer.from("Minha mensagem 2"))

  await channel.sendToQueue('minha_fila', Buffer.from("Mais uma mensagem"))

  channel.close()
  connection.close()
}

main()