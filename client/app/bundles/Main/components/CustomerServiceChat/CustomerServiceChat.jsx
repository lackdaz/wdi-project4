import React from 'react';

export default class CustomerServiceChat extends React.Component {

    /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
    constructor(props, _railsContext) {
        super(props);
    }

    componentDidMount() {
      this.setupSubscription();
    }

    handleNewChat(message) {
      this.props.handleNewChat(message);
      // let message = JSON.parse(comment);
      // this.setState({message: message});
    }

    setupSubscription() {
      let messages = $('#messages')
      if($('#messages').length > 0) {
        var messages_to_bottom;
        let handleNewChat = this.handleNewChat.bind(this)

        messages_to_bottom = function() {
          return messages.scrollTop(messages.prop("scrollHeight"));
        };
        messages_to_bottom()

        App.global_chat = App.cable.subscriptions.create({
          channel: "CustomerSupportChannel"
          }, {
          connected: function() {
            // Called when the subscription is ready for use on the server
          },

          disconnected: function() {
            // Called when the subscription has been terminated by the server
          },

          received: function(data) {
            messages.append(data['message']);
            messages_to_bottom();

            // parse HTML message back to actual message
            let messageHTML = $.parseHTML( data['message'] )
            let p = messageHTML[0].querySelector('.card-text')
            let a = p.innerText.split('says')[1]
            handleNewChat(a.replace(/(\r\n|\n|\r)/gm,"").trim());
          },

          send_message: function(message) {
            this.perform('send_message', {
              'message': message,
            })
          },

          // handleNewChat: this.handleNewChat
        });

        $('#new_message').submit(function(e) {
          var $this, textinput;
          $this = $(this);
          textinput = $this.find('#message_body');
          if ($.trim(textinput.val()).length > 1) {
            App.global_chat.send_message(textinput.val());
            textinput.val('');
          }
          e.preventDefault();
          return false;
        });
      }



      // let messages = document.getElementById('messages')
      // messages_to_bottom = function() {
      //   return messages.scrollTop(messages.prop("scrollHeight"));
      // };
      //
      // messages_to_bottom();

      // App.global_chat = App.cable.subscriptions.create({
      //   channel: "CustomerSupportChannel"
      // }, {
      //   connected: function() {
      //     // Called when the subscription is ready for use on the server
      //   },
      //
      //   disconnected: function() {
      //     // Called when the subscription has been terminated by the server
      //   },
      //
      //   received: function(data) {
      //     messages.innerHTML(data['message']);
      //     // return messages_to_bottom();
      //   },
      //
      //   send_message: function(message) {
      //     @perform('send_message', {
      //       message: message
      //     })
      //   }
      // });



      // App.comments = App.cable.subscriptions.create("CommentsChannel", {
      //   message_id: this.state.message.id,
      //
      //   connected: function () {
      //     // Timeout here is needed to make sure Subscription
      //     // is setup properly, before we do any actions.
      //     setTimeout(() => this.perform('follow',
      //                                   {message_id: this.message_id}),
      //                                   1000);
      //   },
      //
      //   received: function(data) {
      //     this.updateCommentList(data.comment);
      //   },
      //
      //   updateCommentList: this.updateCommentList
      // });
    }

    // handleMessage(e) {
    //
    // }

    // updateName (name) {
    //   this.setState({ name });
    // };

    render() {
      // this.checktone(this.props.response)
      return (
          <div className="chatbox">
            <h3>Talk to our Customer Service</h3>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Chats</h3>
              </div>
              <div className="panel-body" id="messages">
              </div>
            </div>
            <form id="new_message">
              <div className="form-group">
                <input className="form-control" type="text" id="message_body" placeholder="type something to chat" />
              </div>
              <div className="form-group">
                <button className="btn btn-default" id="messageBtn">Send</button>
              </div>
            </form>
          </div>
      );
    }
}
