+++
title = "TCP Attack Lab 0 - Series Introduction"
date = "2023-04-23"
description = "Overview of TCP vulnerability exploration."

tags = ["security","writeup",]
+++


Exploring TCP/IP vulnerabilities.


# Motivation

The TCP protocol is a critical transport layer protocol used in networking.


# Setup Instructions for the Container Environment

We will leverage existing resources created by Professor [Wenliang Du](https://web.ecs.syr.edu/~wedu/) at Syracuse University. Professor Du and his students have created the SEED Security Labs environment.

I am using the SEED Security Lab Ubuntu 20.04 virtual machine. Please visit [SEED Security Labs](https://seedsecuritylabs.org/) for instructions. 

We will use the Docker compose file from the [TCP/ IP Attack Lab](https://seedsecuritylabs.org/Labs_20.04/Networking/TCP_Attacks/). You'll want to unzip the Labsetup folder and run the following commands once you navigate inside the directory:

```bash
dcbuild
dcup -d
```

This will start several Docker containers that simulate several machines. In this lab we will assume the attacker is on the same LAN as the victim machines.

| Machine | IP Address | Notes |
| -------- | -------- | -------- |
| User 1 | 10.9.0.6 | `telnet` Client |
| User 2 | 10.9.0.7 | `telnet` Server |
| Attacker | 10.9.0.1 | Will eventually hijack the `telnet` connection |

That Docker compose file will run a container that represents a server but we will ignore it for these exercises. That container is used to demonstrate SYN flooding attacks but I don't find it as interesting as TCP RST and hijacking attacks.

 
# Learning

We will learn about several tools and techniques:
- Wireshark
- `netcat`
- `telnet`
- Python and its `scapy` module


# That's it!

In this series we explored TCP RST and hijacking attacks and extended the hijacking attack to obtain a reverse shell.


### _Updated: April 23, 2023_
