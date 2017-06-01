class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, email)
    # ActionCable.server.broadcast "chat_rooms_#{message.chat_room.id}_channel",
    ActionCable.server.broadcast "customer_support_channel",
                                 message: render_message(message, email)
  end

  private

  def render_message(message, email)
    MessagesController.render partial: 'messages/message', locals: {message: message, email: email}
  end
end
