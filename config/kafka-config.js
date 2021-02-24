//dependencies
let kafka = require('kafka-node');

const EMAIL_TOPIC = process.env.EMAIL_TOPIC || 
process.env.DEFAULT_EMAIL_TOPIC;

/**
  * Kafka configuration.
  * @function
  * @name connect
  * @param {Object} config all kafka configurations.
  * @returns {Promise} returns a promise.
*/

var connect = function (config) {

  let kafkaProducer = kafka.Producer;
  let keyedMessage = kafka.KeyedMessage;
  
  let client = new kafka.KafkaClient({
    kafkaHost : config.host
  });

  client.on('error', function (error) {
    logger.error("Kafka connection error!");
  });

  let producer = new kafkaProducer(client);

  producer.on('ready', function () {
    logger.info('Connected to Kafka');
  });

  producer.on('error', function (err) {
    logger.error("Kafka producer creation error!");
  })

  _sendToKafkaConsumers(
    config.topics["emailTopic"],
    config.host
  );

  return {
    kafkaProducer: producer,
    kafkaConsumer: kafka.Consumer,
    kafkaClient: client,
    kafkaKeyedMessage: keyedMessage
  };

};

/**
  * Send data based on topic to kafka consumers
  * @function
  * @name _sendToKafkaConsumers
  * @param {String} topic - name of kafka topic.
  * @param {String} host - kafka host
*/

var _sendToKafkaConsumers = function (topic,host) {

  if (topic && topic != "") {

    let consumer = new kafka.ConsumerGroup(
      {
          kafkaHost : host,
          groupId : process.env.KAFKA_GROUP_ID,
          autoCommit : true
      },topic 
    );  

    consumer.on('message', async function (message) {
      if (message && message.topic === EMAIL_TOPIC) {
        emailConsumer.messageReceived(message, consumer);
      }
    });

    consumer.on('error', async function (error) {
      if (error.topics && error.topics[0] === EMAIL_TOPIC) {
        emailConsumer.errorTriggered(error);
      }
    });

  }
};

module.exports = connect;