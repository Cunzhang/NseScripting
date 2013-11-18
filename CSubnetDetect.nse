local http=require "http"
local shortport=require "shortport"
local stdnse=require "stdnse"
local table = require "table"
local string = require "string"

description=[[
sweep domain name]]
author="m0zh3"
categories= {"web","scan"}

-- The Rule Section --
portrule = shortport.portnumber(80)
-- The Action Section --

local response
local url='www.114best.com'
local path='/ip/114.aspx?w='

local function get_links(body)
        links={}
        body=string.lower(body)
        for s in string.gmatch(body,">(%w+%.%w+%.%w+)</a>") do
                table.insert(links,'[+] ' .. s)
        end
        return links
end

action = function(host, port)
                response=http.get(url,port,path..(host.targetname or host.ip))
                return get_links(response.body)
end
