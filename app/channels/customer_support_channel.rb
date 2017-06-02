class CustomerSupportChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "chat_rooms_#{params['chat_room_id']}_channel"
    stream_from "customer_support_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    MessageBroadcastJob.perform_later(data['message'], data['name'])
    # current_user.messages.create!(body: data['message'], chat_room_id: data['chat_room_id'])
  end
end
