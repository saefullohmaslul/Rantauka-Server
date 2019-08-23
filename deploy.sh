#!/bin/bash
cd node_modules/.bin/
sequelize db:migrate:undo
sequelize db:migrate:undo
sequelize db:migrate:undo
sequelize db:migrate:undo
sequelize db:migrate
