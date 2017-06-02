class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, name)
    # ActionCable.server.broadcast "chat_rooms_#{message.chat_room.id}_channel",
    ActionCable.server.broadcast "customer_support_channel",
                                 message: render_message(message, name)
  end

  private

  def render_message(message, name)
    MessagesController.render partial: 'messages/message', locals: {message: message, name: name}
  end
end
