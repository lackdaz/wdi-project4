# http://ruby-doc.org/stdlib-2.0.0/libdoc/open-uri/rdoc/OpenURI.html
require 'open-uri'

class SentimentController < ApplicationController
  def checktone
    # Actually fetch the contents of the remote URL as a String.
    buffer = open(url).read
  end
end
