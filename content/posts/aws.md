+++
title = "AWS EC2 Comparison"
date = "2022-07-15"
description = "A comparison study of AWS EC2 T2 machines."

tags = ["engineering",]
+++


Is AWS EC2 Large worth its 500% price tag compared to the EC2 Micro?


# Motivation

AWS offers a variety of remote servers. One of its most popular categories is the suite of EC2 T2 instances. Two of these instances are the Micro and the Large. The Micro has 1 vCPU, 1GiB of RAM, and a rate of 0.0166 USD per hour when running Linux. The large has 2 vCPUs, 8GiB of RAM, and a rate of 0.0928 USD per hour, or over 5 times that of the Micro. But is the extra vCPU and RAM worth the 500% cost increase when running a web server?


# Experimental Set Up

Apache HTTP 2.4.53 was installed on an AWS EC2 T2 Micro instance and an AWS EC2 T2 Large instance both running Amazon Linux 2 x86 Kernel-5.10, SSD.

To test the two instances for Apache performance when serving different content types, one HTML file of size 143 bytes, one PHP file containing only the phpinfo() function that displays PHP config information, and one JPEG of size 426 kbytes were placed in Apache's root directory on each instance to act as testing endpoints.

Apache Bench (ab) was run using a third AWS EC2 T2 Micro instance running Apache HTTP 2.4.53 on Amazon Linux 2 Kernel-5.10 as the request generating machine. A total of 10,000 requests were sent to each endpoint at a concurrency level of 1000. All three machines were part of the same VPC. Requests per second and time to fulfill a request were measured.


# Results

Figure 1 shows the requests per second (Fig. 1a) and time per request (Fig. 1b) that Apache was able to handle the requests on each instance.

!["requests per second"](/blog/images/aws/requests.png)

Figure 1a. Requests per second when Apache serves three file types on different EC2 instances. 

---

!["time per request"](/blog/images/aws/time.png)

Figure 1b. Time per request was measured across all concurrent requests.

---

To visualize the passage of time as the concurrent requests were fulfilled, GNUPlot was used to graph cumulative total time taken as requests were completed (Figure 2). The micro and large instances are virtually matched in terms of cumulative distribution and total time taken for all three content types.

!["html"](/blog/images/aws/html.png)
       
Figure 2a. Time passed as Apache serves concurrent requests of an HTML page on EC2 T2 Micro and Large instances.

---
       
!["php"](/blog/images/aws/php.png)

Figure 2b. Time passed as Apache handles concurrent requests of a PHP script on EC2 T2 Micro and Large instances. 

---
       
!["jpeg"](/blog/images/aws/jpeg.png)

Figure 2c. Time passed as Apache serves concurrent requests of a JPG file on EC2 T2 Micro and Large instances.

---
      

# Discussion

The requests per second and time per request graphs and cumulative time plots show that Apache performed slightly faster on the large instance when handling PHP and serving JPEG files, but was in fact slower on the large instance when serving HTML.

It is difficult to say whether the differences in recorded metrics are significant. Assuming the differences in performance for PHP and JPEG files are significant, it is hard to conclude that the large instance is worth the 500% cost increase. A possible source of bottlenecking lies with Apache. As the remote machines communicate with Apache to serve the content, the machine may be limited by its computing power to make the connection with Apache which may explain why the large instance was able to perform slightly better but ultimately the system may have been limited overall by Apache's ability to fulfill the requests which is why even though the large instance has double the vCPUs, a performance on the magnitude of being at least two times better than the micro instance was not observed. Apache is known to be a bulky piece of software with robust configuration capabilities and dynamic content processing which may explain why it is a source of a bottleneck.

AWS EC2 T2 offers micro and large instances as part of this line of remote machines. The large offers double the vCPUs and 8 times the RAM, yet it doesn't seem to offer 8 times the performance that would match its cost that is over 5 times larger than the micro instance. For use cases similar to the ones imitated in this experiment the micro instance seems to be enough to get the job done.
