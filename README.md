# Geo-Quiz-js

# **Background**

Geo-Quiz is a simple and efficient way for people to learn the name and location of the states of the United States of America. 

Geo-Quiz offers a learning mode: it first enables a user to assimilate the names and locations of all states by hovering over a dynamic map.

Once the user feels comfortable putting it’s knowledge to test, Geo-Quiz offers a testing mode:

1. The user has a limited amount of time to find as many state's location as possible.
2. Once the timer starts the user will be prompted the name of a state they need to find on the map.
    1. If the user clicks incorrectly on the map (the location selected is not the one of the state prompted), the state will be colored red. The user can try to find the state location again.
    2. If the user clicks correctly on the map, the state will be colored green. The user will be prompted another states name to find.
3. When the time is up a final score will be calculated based on the total amount of correct and incorrect tries of the user.

# **Functionality & MVPs**

- The user can choose between either the learning or the testing mode.
- Learning mode:
    - The user can visualize the map of the United States of America divided by states.
    - The user can hover over any state which will change its background color and display the state's name.
- Testing mode:
    - Once the user clicks "start" a timer is activated which will end the game once it gets to zero.
    - State names are displayed one after the other for the user to guess its location.
    - An accurate guess equal to 1 point and changes the background color of the state to green.
    - An inaccurate guess equal to -1 point and changes the background color of the state to red.
    - Once a state location is guessed accurately the map background color is reset to black and another state name is prompted.
    - The final score of the user is displayed once the timer gets to zero.
- At any point in time, the user can click the back arrow to exit the current mode and get back to the main menu.

# **Wireframes**

![WhatsApp Image 2021-12-26 at 13 11 16 (2)](https://user-images.githubusercontent.com/89544506/147420590-6ff6e88d-b348-4a6c-86c5-144c9d72d191.jpeg)

![WhatsApp Image 2021-12-26 at 13 11 16 (1)](https://user-images.githubusercontent.com/89544506/147420589-96d0d2b9-5ce4-47d1-bac0-44eb454b730e.jpeg)

![WhatsApp Image 2021-12-26 at 13 11 16](https://user-images.githubusercontent.com/89544506/147420588-734dd987-87b3-4888-a899-7d08e4d7cbc0.jpeg)

# **Technologies, Libraries, APIs**

D3 library

SVG Map | Resources

# **Implementation Timeline**!

- Friday Afternoon & Weekend - Integrate the SVG map with each state data.
- Monday - Implement the game’s logic.
- Tuesday - Set the main page and the learning mode.
- Wednesday - Create a count-down timer and a score mode.
- Thursday Morning - Deploy to GitHub and if I have time, add bonus features.

# **Bonus Features (Optional)**

- Add to main menu access to the historical scores. Historical scores are stored and displayed in an index.
- The user can choose from three levels of difficulty when entering the testing mode.
- The user has access to mnemonic tips in the learning mode to increase information retention.
