require 'json'

class ChatBotController < ApplicationController
  before_action :parse

  def index
    steps = JSON.parse(@@file)
    @chat_bot_props = { steps: steps }
  end

  private
  def parse
    @@file = File.read("#{Rails.root}/public/logic.json")
  end
end
