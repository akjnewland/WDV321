    //Instructions:
    //1. Create a JavaScript object called eventRegistration.  This object will hold one or more registrations
    //  each registration will have a name, email, phone and registration date (use the current date)
    //
    //2. Create a hit counter that will record each time somebody comes to this page.  Store the hit counter in a cookie.
    //  Each time somebody comes to this page display the current value of the hit counter next to "Current Activity:"

    //Sign In button:
    //When the sign in form is clicked the following will happen
    //  a. Somewhere on the page display a form to accept the username and password.  Use one of methods we reviewed
    //      to dynamically display the form when needed.
    //  b. When that form is submitted compare the input to the contents of the membersInfo object.
    //  c. If you find a match in the membersInfo object create a cookie called authorizedUser with the username as its value.

    let membersInfo = {
      memberUserNames: [
        "A1D2C4",
        "B2D4C6",
        "B3C2D1"
      ]
    }

    const date = new Date();

    const eventRegistration = {
      name: "",
      email: "",
      phone: "",
      registration: date
    };