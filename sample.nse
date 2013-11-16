description = [[
Issues an arbitrary HTTP GET request
]]
 
---
-- @usage
-- nmap --script http-get [--script-args http-get.path=/status] -p <port> <host>
-- @args http-get.path The path to request (defaults to /)
--       http-get.match String to match in the HTTP response (incl. headers)
-- @output
-- PORT   STATE SERVICE
-- 80/tcp open  http
-- | http-get: 
-- |   GET /status -> 200 OK
-- |_  Matches: Server Status
-- @changelog
-- 2012-04-05 - created by David Wittman <david@wittman.com>
--
 
author = "David Wittman <david@wittman.com>"
license = "WTFPL"
categories = {"discovery", "safe"}
 
require("url")
require("http")
require("stdnse")
require("shortport")
 
portrule = shortport.service ({"http","https"})
 
action = function(host,port)
    local path
    local match
    local response
    local output = {}
 
    path = stdnse.get_script_args('http-get.path') or '/'
    match = stdnse.get_script_args('http-get.match')
    
    -- Make HTTP GET request
    stdnse.print_debug("%s: %s GET %s",
                       SCRIPT_NAME,
                       host.targetname or host.ip,
                       path)
    response = http.get(host, port.number, path)
        
    -- Request failed (not an HTTP server)
    if not response.status then
        -- Bad response
        stdnse.print_debug("%s: %s GET %s - REQUEST FAILED",
                           SCRIPT_NAME,
                           host.targetname or host.ip,
                           path)
        -- Exit
        return
    end
 
    -- Success
    if response.status == 200 then
        -- Great success
        stdnse.print_debug("%s: %s GET %s - 200 OK",
                           SCRIPT_NAME,
                           host.targetname or host.ip,
                           path)
        table.insert(output, ("GET %s -> 200 OK"):format(path))
 
        -- Check response for match
        if match and http.response_contains(response, match) then
            table.insert(output, ("Matches: %s"):format(match))
        end
    -- Non-200 response status
    else
        stdnse.print_debug("%s: %s GET %s - %d", 
                           SCRIPT_NAME,
                           host.targetname or host.ip,
                           path,
                           response.status)
        table.insert(output, ("GET %s -> %d"):format(path, response.status))
    end
 
    return stdnse.format_output(true, output)
 
end
 
-- vim: set ft=lua expandtab ts=4 sw=4:
