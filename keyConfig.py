# Author: Michael Brady - X00136103
# This script reads through the config file, pulls out relevant controls for each system, and prompts the user to change them.
# The script also generates a device ID similar to Mednafen's.

import fileinput
import sys
import os

controllerType = input("Which controller are you setting up?")
system = input("And for which system?")
file = '/home/mick/.mednafen/{}.cfg'.format(system)
outfile = file[:-4] + "_temp.cfg"

# read through the config file and split it into an array
conf = open(file).read().splitlines()
confOut = open(outfile, 'w')
for i in range(len(conf)): # index is used to fetch lines 1 or 2 elements ahead
    if conf[i] == ";CONTROL":

        #check if the next line is the end of the control section
        while conf[i + 1] != ";CONTROLEND":
            toRemap = conf[i + 1][1:] # get the name of the control we're remapping
            toMap = input("Input for {}? ".format(toRemap))
            currentConfig = conf[i + 2].split(" ") # get the currently mapped control

            currentConfig[1] = "joystick"
            currentConfig[2] = "0x0003054c05c481110008000d00000000"
            currentConfig[3] = toMap

            print(currentConfig)
            currentConfig = " ".join(currentConfig)
            conf[i + 2] = currentConfig
            i += 2 # increment by two to skip to the next control
                   # conf file has to be formatted properly for this

output = "\n".join(conf)
confOut.write(output)
os.remove(file)
os.rename(outfile, file)