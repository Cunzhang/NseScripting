local http=require "http"
local shortport=require "shortport"
local stdnse=require "stdnse"
local table = require "table"

description=[[
Attempts to scan website file]]
author="m0zh3"
categories= {"default","discovery"}

-- The Rule Section --
portrule = shortport.http
-- The Action Section --

local response

action = function(host, port)
                local results = {}
                local f=io.open(stdnse.get_script_args("dict"),'r')
                while true do
                        local i=f:read("*line")
                        if(not(i)) then
                                break
                        end
                        response=http.generic_request(host,port,"GET",i)
                                if (response.status ~= 404) then
                                        table.insert(results,("%s %d"):format(i,response.status))
                                end
                end
                if #results>0 then
                        return stdnse.format_output(true,results)
                else
                        return "Oops! Nothing~~~"
                end
end