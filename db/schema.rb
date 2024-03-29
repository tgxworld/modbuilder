# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140910074229) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chapters", force: true do |t|
    t.string   "name"
    t.integer  "chapter_number"
    t.string   "slug"
    t.integer  "mod_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chapters", ["mod_id"], name: "index_chapters_on_mod_id", using: :btree
  add_index "chapters", ["slug"], name: "index_chapters_on_slug", using: :btree

  create_table "mods", force: true do |t|
    t.string   "name"
    t.string   "code"
    t.text     "description"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
  end

  add_index "mods", ["slug"], name: "index_mods_on_slug", using: :btree

end
