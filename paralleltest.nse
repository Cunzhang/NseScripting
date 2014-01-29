local coroutine = require "coroutine"
local nmap = require "nmap"
local stdnse = require "stdnse"
local http = require "http"
local shortport = require "shortport"
local io = require "io"
local openssl = stdnse.silent_require "openssl"

description = [[
paralle test
]]

author = "m00zh33"
license = "Same as Nmap--See http://nmap.org/book/man-legal.html"
categories = {"test","test"}

portrule = shortport.http

--local links = {}
local requests = {}

local function thread_main (host,port,responses)
	local condvar = nmap.condvar(responses)
	local resp = nil
	--local allReqs = nil
	stdnse.print_debug("------------------ %d,%d",#requests,#requests/40)
	for i = 1,math.floor(#requests/40) do
		for j = 40*(i-1)+1,40*i do
			--stdnse.print_debug("%d %s",j,requests[j])
			--allReqs = http.pipeline_add(requests[j],nil,allReqs)
			resp = http.get(host,port,requests[j],{no_cache = true})
			if resp.status == 200 then stdnse.print_debug("[+] %d %d %d",stdnse.tohex(openssl.md5(resp.body)),requests[j],resp.status) end
		end
		--stdnse.print_debug("First !!!!!!!!!!!!!!!!! %s",host)
		--local p = assert(http.pipeline_go(host,port,allReqs))
		--stdnse.print_debug("**************** %d %d",i,#p)
		--stdnse.print_debug("First +++++++++++++++++ %d",#p)
		--stdnse.print_debug("lalalala~~~~~~~ %d",#allReqs)
		--allReqs = nil
	end
	for i = math.floor(#requests/40) * 40 + 1, #requests do
		--stdnse.print_debug(requests[i])
		--allReqs = http.pipeline_add(requests[i],nil,allReqs)
		resp = http.get(host,port,requests[i],{no_cache = true})
                if resp.status == 200 then stdnse.print_debug("[+] %d %s %d",stdnse.tohex(openssl.md5(resp.body)),requests[i],resp.status) end
	end
	--stdnse.print_debug("Second !!!!!!!!!!!!!!!!! %s",host)
        --p = assert(http.pipeline_go(host,port,allReqs))
       	--stdnse.print_debug("Second +++++++++++++++++ %d",#p)
	--for i, response in ipairs(p) do stdnse.print_debug("[+] %s",stdnse.tohex(openssl.md5(response.body)) end
	--stdnse.print_debug("**************** %d",#p)
	condvar "signal"
end

local function many_requests(host,port)
	local threads = {}
	local responses = {}
	local condvar = nmap.condvar(responses)
	--[[local i = 1;
	repeat
		local j = math.min(i,#requests)
		local co = stdnse.new_thread(thread_main,host,port,responses);
		threads[co] = true;
		i = j+1
	until i > #requests]]
	local co = stdnse.new_thread(thread_main,host,port,responses)
	repeat
		for thread in pairs(threads) do
			if coroutine.status(thread) == "dead" then threads[thread] = nil end
		end
		if ( next(threads)) then
			condvar "wait"
		end
	until next(threads) == nil
	return responses
end

action = function(host, port)
	--[[local response = http.get('www.114best.com',port,'/ip/114.aspx?w='..(host.targetname or host.ip))
	--stdnse.print_debug("%s",response.body)
	for s in string.gmatch(response.body,'pop=.http://([%w%-%.]+)') do
		table.insert(links,s)
	end
	--stdnse.print_debug("%d",#links)
	
	-- Remove Invalid Target
	for i = #links,1,-1 do
		local resp = http.get(links[i],port,'/')
		if resp.status ~= 200 then table.remove(links,i) end
	end
	for _,s in ipairs(links) do stdnse.print_debug(s) end]]
	--stdnse.print_debug("%d",#links)
	local Threads = {}
	local path = stdnse.get_script_args('cms.path')
	local f = io.open(path,'r')
	while true do
                local t = f:read("*line")
                if(not(t)) then break end
                --stdnse.print_debug(t)
		table.insert(requests,t)
	end
	f:close()
	many_requests(host,port)
end
