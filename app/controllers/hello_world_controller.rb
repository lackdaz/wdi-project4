class HelloWorldController < ApplicationController
  def index
    render 'index', layout: 'landing'
  end
end
