+++
title = "Apache vs nginx"
date = "2022-07-15"
description = "Comparing Apache and nginx web servers."

tags = ["engineering",]
+++


NGINX and Apache showdown.


# Motivation

Apache HTTP Server (Apache) and Nginx are popular open source web servers. Nginx was developed to serve content faster than Apache with less overhead. But are all types of content served faster with Nginx?


# Experimental Set Up

Apache HTTP 2.4.53 and Nginx 1.20.0 were installed on an AWS EC2 T2 Micro instance running Amazon Linux 2 x86 Kernel-5.10, SSD.

To test the two web servers for speed in serving different content types, one HTML file of size 206 bytes, one PHP file containing only the phpinfo() function that displays PHP config information, and one JPG of size 35 kbytes were placed in each web server's default root directory as testing endpoints.

Apache Bench (ab) was run using another AWS EC2 T2 Micro instance running Apache HTTP 2.4.53 on Amazon Linux 2 Kernel-5.10 as the request generating machine. A total of 10,000 requests were sent to each endpoint at a concurrency level of 1000. The generating machine was not a part of the same VPC as the host machine. Requests per second and time to fulfill a request were measured.


# Results

Nginx was faster than Apache in serving static content but Apache handled dynamic content faster (Fig. 1). Nginx was able to serve more static file requests per second (Fig. 1a) but took longer to serve dynamic PHP files (Fig. 1b).

!["requests per second"](/blog/images/nginx-apache/requests.png)

Figure 1a. Requests per second when Apache and Nginx serve three file types. Time per request was measured across all concurrent requests.

---

!["time per request"](/blog/images/nginx-apache/time.png)

Figure 1b. Time per request for Apache and Nginx to serve three file types. Time per request was measured across all concurrent requests.
        
---

To visualize the passage of time as the concurrent requests were fulfilled, GNUPlot was used to graph cumulative total time taken as requests were completed (Figure 2). For HTML and JPG content NGINX fulfills all 10,000 requests in less total time (Fig. 2a) whereas it takes slightly longer to handle PHP (Fig. 2b).

!["html"](/blog/images/nginx-apache/html.png)

Figure 2a. Time passed as Apache and Nginx serve concurrent requests of an HTML page.

---

!["php"](/blog/images/nginx-apache/php.png)

Figure 2b. Time passed as Apache and Nginx handle concurrent requests of a PHP script.

---

!["jpg"](/blog/images/nginx-apache/jpg.png)

Figure 2c. Time passed as Apache and Nginx serve concurrent requests of a JPG file.

---
        

# Discussion

Nginx was able to outperform Apache for static HTML and JPG files. However, for dynamic content like PHP it was slightly outperformed by Apache. This was reasonable to expect because Apache embeds dynamic content language processors into each worker instance so it is able to handle dynamic content execution internally. Nginx cannot process dynamic content natively and must use a reverse proxy to hand off the dynamic content processing to an external interpretor such as Apache. But this means Nginx does not have the overhead of having the language processor present for static content and is faster when serving static content. However, the need to wait for an external processor to handle dynamic pages presents a bottleneck for Nginx.

The architecture of each web server extends beyond the presence or lack of a dynamic language processor. Nginx is asynchronous, non-blocking, and event-driven while Apache uses an essentially multi-threaded structure. Nginx worker processes handles connections by placing them in an event loop similar to how NodeJS handles processes and continuouly checking for new events to add to the loop. As events are processed they are removed from the loop. Apache users have the capability to configure what processing modules Apache uses but all use the general thread-based approach. Apache has the bottleneck of relying on the processing of these threads before new connections can be made and their requests executed.

Apache also has a distributed configuration system where users can configure the web server for each content directory with .htaccess files. When handling a request, Apache has to check for these files in each component of the requested path. Nginx centralizes configuration to the default configuration file. This boosts the performance of Nginx over Apache for static file reads because it does not have to search for these .htaccess files and interpret them, it just takes the configurations from the central file.

Overall, both web servers have their advantages and disadvantages. Apache comes with a hefty amount of configuration capability and native dynamic content processing whereas Nginx ditches much of the bulk to make static content serving faster but relies on external support for dynamic content handling. One possible tech stack might use Nginx primarily with a reverse proxy connection to an Apache server to handle dynamic content.
