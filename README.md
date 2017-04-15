# dipper_assign:
Problem Statement 

Implement a server which should be capable of doing the following:
1. Exposes a GET API as &quot;api/request?connId=19&amp;timeout=80&quot;
    This API will keep the request running for provided time on the server side. After the successful 
    completion of the provided time it should return {&quot;status&quot;:&quot;ok&quot;}

2. Exposes a GET API as &quot;api/serverStatus&quot;
    This API returns all the running requests on the server with their time left for completion. E.g {&quot;2&quot;:&quot;15&quot;,&quot;8&quot;:&quot;10&quot;} 
    where 2 and 8 are the connIds and 15 and 10 is the time remaining for the requests to complete (in seconds).

3. Exposes a PUT API as &quot;api/kill&quot; with payload as {&quot;connId&quot;:12}
    This API will finish the running request with provided connId, so that the finished request returns {&quot;status&quot;:&quot;killed&quot;} 
    and the current request will return {&quot;status&quot;:&quot;ok&quot;}. If no running request found with the provided connId on the server
    then the current request should return &quot;status&quot;:&quot;invalid connection Id : &lt;connId&gt;&quot;}

You can try running your application with curl for testing. Try to implement the solution which would be efficient and scalable.
Implement the above by building a socket server accepting HTTP requests.

This assignment is done using Node.js.

How to run this in your PC:

1. Install Postman.
2. Download this whole project in one folder named "dipper_assign".
    Directory would be like:
    dipper_assign(folder):
      -bin/
      -node_modules/
      -public/
      -routes/
      -views/
      -app.js
      -app.json
      -package.json
3. Open postman:
    Enter URL for:
      i) First task:
        localhost:3000/request?connId=1&timeout=20
      ii) Second task:
        localhost:3000/serverStatus
      iii) Third task:
        localhost:3000/kill?connId=1
   Note: you can enter any value for connId and timeout
