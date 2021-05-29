## List of tasks that are done

- [x] All work related to wallet links are available in branch `feature/domain-handle`
- [x] created carousel with links for desktop and mobile
- [x] Created the api for links to update links data from db
- [x] Search by any handle they wish and filter the links available
- [x] Integrated payment system stripe
- [x] 4.1 Created payment api

- [x] Show only 2 categories for desktop and one Item for mobile
- [x] Integrated Signup, Login and forgot password with email
- [x] Send email, verify email and redirect to buy links page

## List of tasks that needs attention

- [ ] Design Signup page similar to tiktok Signup page
- [ ] Integrate phone registration into the Signup flow
- [ ] This is partially done and available in branch `feature/signup-phone-sms`

- [ ] Integrate Links API to frontend to loading links through API instead of loading directly from firebase
- [ ] Update rules section in firebase to handle security
- [ ] Check user handle based on category
      eg: A handle taken in one category might be available in other category
- [ ] Lazy load Links based on category on desktop and mobile
- [ ] Improve Stripe payment screen for mobile and desktop(if necessary)
- [ ] Integrate Succss page after stripe payment
- [ ] Integrate Failure page after stripe payment
- [ ] Move hardcoded paths to configs and constants
