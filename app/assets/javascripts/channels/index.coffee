$(document).on "turbolinks:load", ->
  messages = $('#messages')
  if $('#messages').length > 0
    messages_to_bottom = -> messages.scrollTop(messages.prop("scrollHeight"))

    messages_to_bottom()

    App.global_chat = App.cable.subscriptions.create {
        # channel: "ChatRoomsChannel"
        channel: "CustomerSupportChannel"
        # chat_room_id: messages.data('chat-room-id')
      },
      connected: ->
        # Called when the subscription is ready for use on the server

      disconnected: ->
        # Called when the subscription has been terminated by the server

      received: (data) ->
        # Data received
        messages.append data['message']
        messages_to_bottom()

      # send_message: (message, chat_room_id) ->
      send_message: (message) ->
        # @perform 'send_message', message: message, chat_room_id: chat_room_id
        @perform 'send_message', message: message

    $('#new_message').submit (e) ->
      $this = $(this)
      textinput = $this.find('#message_body')
      if $.trim(textinput.val()).length > 1
        # App.global_chat.send_message textarea.val(), messages.data('chat-room-id')
        App.global_chat.send_message textinput.val()
        textinput.val('')
      e.preventDefault()
      return false
