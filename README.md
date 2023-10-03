# benchmark

If you have Node.js, Deno, Bun, Docker and k6 installed, you might be able to run the test.sh bash script (the user executing needs to have docker permissions).\
The script creates an image of an application, runs a container with the image, and tests the application with k6, for all applications, in sequence. Then it does the same but without conterization. Lastly it prints some summary test data.\
Total summaries are also saved to the `summaries` folder.\
Test can be configured in the `k6.js` file.\
\
This is probably over engineered, but, you know, why do something manually for 5 min when you can automate it for 6h?
