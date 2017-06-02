class CreateBotHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_histories do |t|
      t.text :steps
      t.text :values

      t.timestamps
    end
  end
end
