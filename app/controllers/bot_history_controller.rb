class BotHistoryController < ApplicationController
  def create
    bot_history =BotHistory.new(bot_history_params)
    message = bot_history.save ? "success" : "fail"
    render json: { message: message }, status: :ok
  end

  private
  def bot_history_params
    params.require(:bot_history).permit(:steps, :values)
  end
end
