require 'json'

class ChatBotController < ApplicationController
  @@file = File.read("#{Rails.root}/public/logic.json")
  # @@file = File.read("./logic.json")

  def index
    steps = JSON.parse(@@file)
    @chat_bot_props = { steps: steps }
  end
end
