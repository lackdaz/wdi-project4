class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    # ActionCable.server.broadcast "chat_rooms_#{message.chat_room.id}_channel",
    ActionCable.server.broadcast "customer_support_channel",
                                 message: render_message(message)
  end

  private

  def render_message(message)
    MessagesController.render partial: 'messages/message', locals: {message: message}
  end
end
