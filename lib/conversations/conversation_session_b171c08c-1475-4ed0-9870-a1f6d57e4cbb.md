### Adam slam (1/1/2024, 5:46:16 PM)

[object Object]

### Hamza Baba (1/2/2024, 6:17:33 PM)

Hey Adam

Here are the 2 payments I was talking about...

### Hamza Baba (1/2/2024, 6:17:42 PM)

[object Object]

### Hamza Baba (1/2/2024, 6:17:45 PM)

[object Object]

### Adam slam (1/3/2024, 8:12:06 AM)

[object Object]

### Adam slam (1/3/2024, 8:12:51 AM)

hi hamza , let me check it with our billing team and get back to you ASAP

### Adam slam (1/3/2024, 8:12:54 AM)

[object Object]

### Hamza Baba (1/3/2024, 12:31:05 PM)

Okay thank you Adam.

### Adam slam (1/3/2024, 1:13:48 PM)

[object Object]

### khadija mou (1/4/2024, 9:31:56 AM)

@adam 
Hello Hamza,
After checking with our team, the  31.98 USD is for upgrading the account (it was on January the first ), and the 11 USD is for your sales fees.

### Adam slam (1/4/2024, 9:52:13 AM)

Hello Hamza,
After checking with our team, the  31.98 USD is for upgrading the account (it was on January the first ), and the 11 USD is for your sales fees.

### Adam slam (1/4/2024, 9:52:16 AM)

[object Object]

### Hamza Baba (1/4/2024, 12:49:27 PM)

ok thank you :)

### Yousra Chanaoui (1/4/2024, 12:49:46 PM)

[object Object]

### Hamza Baba (1/5/2024, 1:20:10 PM)

Hey Adam,

I have a question for the Dev team regarding Snapchat pixel implementation.

My Snap pixel gives me 2 errors (as you can see in the screenshot):
- Invalid phone number
- Invalid email address

I'm using Automated Matching and I think to get rid of the error I need the email and phone variables used in Lightfunnels.

Here is the pixel code:

<!-- Snap Pixel Code -->
<script type='text/javascript'>
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');

snaptr('init', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', {
'user_email': '__INSERT_USER_EMAIL__'
});

snaptr('track', 'PAGE_VIEW');

</script>
<!-- End Snap Pixel Code -->

### Hamza Baba (1/5/2024, 1:20:24 PM)

[object Object]

### Yousra Chanaoui (1/5/2024, 2:26:32 PM)

Hi there 
For tracking you don't need to add any script since they are already fired aatomatically you just need to install the pixel then link the pixel ID with your store or funnel

### Yousra Chanaoui (1/5/2024, 2:26:36 PM)

[object Object]

### Hamza Baba (5/17/2024, 11:30:07 AM)

[object Object]

### Hamza Baba (5/17/2024, 11:30:09 AM)

Hello 
I hope you're doing well

The order button on all my active funnels is not working today. The button just keeps loading (as you can see in the attachment). Customers are not directed to the thank you page where I track my conversions. 

This is hurting my ad campaign conversion data.

Can you fix this ASAP, please?

Thank you.
- Hamza.

### hafsa BOUALLI (5/17/2024, 11:36:01 AM)

Hi Hamza, 
we apologize for any inconvenience caused, can you please send us the funnel link, please

### hafsa BOUALLI (5/17/2024, 11:36:03 AM)

[object Object]

### Hamza Baba (5/17/2024, 12:10:00 PM)

Here is a funnel example: https://www.drucio.xyz/sakura-shampoo-UAE-TT

This is affecting all funnels in my account.

This is getting worse! now all my funnels don't even load and the platform
seems to be in maintenance.

I'm forced now to turn off all my active ad campaigns.

### Yousra Chanaoui (5/17/2024, 12:11:01 PM)

salam Hamza 
the platform is under maintenance due to the issue in the storfront

### Yousra Chanaoui (5/17/2024, 12:11:14 PM)

our team is actively working on fixing this

### Yousra Chanaoui (5/17/2024, 12:11:29 PM)

as soon as we have an update I will let you know

### hafsa BOUALLI (5/17/2024, 12:25:03 PM)

Hi there, 
the issue has been fixed, please test

### hafsa BOUALLI (5/17/2024, 12:25:04 PM)

[object Object]

### Hamza Baba (5/17/2024, 1:14:32 PM)

Still the same issue.

Here is a funnel example: https://www.drucio.xyz/sakura-shampoo-UAE-TT

Here is the loom recording:

https://www.loom.com/share/09e6decd75fb465ea795dccf268cbc8d?sid=e86b22e0-1166-41fa-9d1b-ae297da8ea76

### hafsa BOUALLI (5/17/2024, 1:15:42 PM)

Please allow me to double check with the team

### Yousra Chanaoui (5/17/2024, 1:16:39 PM)

thank you for the video recording it was helpful, the team is working on fixing this as soon possible

### Yousra Chanaoui (5/17/2024, 1:17:24 PM)

[object Object]

### Yousra Chanaoui (5/17/2024, 4:10:02 PM)

Hi the issue should be fixed please check

### Yousra Chanaoui (5/17/2024, 4:10:05 PM)

[object Object]

### Hamza Baba (5/17/2024, 4:57:37 PM)

yes, it seems to be working fine again.
Thank you

### hafsa BOUALLI (5/17/2024, 4:58:23 PM)

[object Object]

### Hamza Baba (5/19/2024, 6:28:46 PM)

Hello
I hope you're doing well

I want to try the split test node to test 2 different offers.

I set up the split test node with 50% traffic weight for each variation (As you can see in the screenshot).

However, when I tested accessing the funnel from different IPs, the traffic weight attribution didn't seem to be 50% - 50%, but rather random.

Can you please explain to me how the split test node distributes traffic? Is it time-based, or IP-based...?

Funnel link: https://www.drucio.xyz/Retinol-Capsules-Split-KW-TT/

Thank you so much.
- Hamza.


Can you please

### Hamza Baba (5/19/2024, 6:29:16 PM)

[object Object]

### hafsa BOUALLI (5/19/2024, 6:30:42 PM)

Hi there! Thank you for contacting us. We have received your ticket, and our support team is currently reviewing it. We will get back to you with a response as soon as possible. Please feel free to let us know if you have any further questions or concerns.

### hafsa BOUALLI (5/19/2024, 6:30:44 PM)

[object Object]
