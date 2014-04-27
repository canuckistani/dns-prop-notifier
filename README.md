# DNS Propogation notifier

Checks if a domain has changes to a specific ip and then sends a pushover notification. Useful if you want to go for a quick coffee during that long dark teatime of the soul between *changing* your domain's ip address and the point at which it actually becomes useful generally on the internet.

###Current status: alpha

This is just a dumb script with some dependencies. I should take the time to make it useful, eg:
* create a self-contained node module so it could be used in other node programs
* create a command-line interface so it can be called from cron
* consider sugar like:
** multiple domain name support
** checking an array of dns server ip addresses and reporting when a majority agree.
* consider other notification methods.
