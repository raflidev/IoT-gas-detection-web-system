import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'ws://broker.mqttdashboard.com:8000/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}
const client = mqtt.connect(host, options)

function App() {
  const [mq7, setMq7] = useState(0);
  const [mq135, setMq135] = useState(0);

    
  client.on('message', (topic, message, packet) => {
    const obj = JSON.parse(message.toString());
    setMq7(obj.mq7);
    setMq135(obj.mq135);
  })

  useEffect(() => {
    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })
    
    client.on('connect', () => {
      console.log('Client connected:' + clientId)
      // Subscribe
      client.subscribe('rafli/mq7135/gas/mq135', { qos: 0 })
    })
  }, [])
  
  return (
    <div className="bg-gray-400 w-screen h-screen">
      <div className="flex justify-center h-screen">
        <div className="w-full lg:w-3/6 bg-gray-200">
          <div className="bg-gray-100 py-2">
            <h1 className="text-xl text-center font-medium">GasSense</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 p-20">
            <div className="w-full h-56 bg-gray-100 rounded p-3">
              <div className="grid grid-rows-3 content-center w-full h-56">
                <div className="py-2 mx-auto">
                  <div className="p-4 bg-red-100 rounded-full h-16 w-h-16">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                  </svg>
                  </div>

                </div>
                <div className="m-auto font-medium text-3xl">
                  {mq7}
                </div>
                <div className='mx-auto text-gray-400'>
                  MQ-7
                </div>
              </div>
            </div>
            <div className="w-full h-56 bg-gray-100 rounded p-3">
              <div className="grid grid-rows-3 content-center w-full h-56">
                <div className="py-2 mx-auto">
                  <div className="p-4 bg-yellow-100 rounded-full h-16 w-h-16">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>
                  </div>
                </div>
                <div className="m-auto font-medium text-3xl">
                  {mq135}
                </div>
                <div className='mx-auto text-gray-400'>
                  MQ-135
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto sm:w-3/4 md:w-2/4 fixed inset-x-0 bottom-10 px-10">
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 my-4 rounded-md text-center text-lg flex justify-center items-center w-full">
              Predict
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
