module ChatBotHelper

  steps = [
   {
     id: '0',
     message: 'Welcome!!',
     trigger: '1',
   },
   {
     id: '1',
     message: 'I am Raymond. What is your name?',
     trigger: '2',
   },
   {
     id: '2',
     user: true,
     trigger: '3',
   },
   {
     id: '3',
     message: 'Hello {previousValue}!',
     end: true,
     trigger: '6'
   },
   {
     id: '5',
     message: 'You are so smart!',
     end: true,
   },
   {
     id: '6',
     message: 'Bye!',
     end: true,
   },
 ];
end
