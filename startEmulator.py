# Author: Michael Brady - X00136103
# This file takes a ROM filename and starts the appropriate emulator

import subprocess
from subprocess import Popen
import sys
import os

systemExtensions = [".gb", ".gbc",".nds", ".bin", ".cue"]

#if no arguments given somehow, something's gone really wrong
if len(sys.argv) == 1:
    raise ValueError("err in '{}' - no filename passed".format(sys.argv[0])) 

game, system = os.path.splitext(sys.argv[1])

#if the passed file isn't actually runnable by the emulator, throw exception
if system not in systemExtensions:
    raise ValueError("err in '{}' - invalid file format. Got '{}'".format(sys.argv[0], system)) 

#if game doesn't exist, throw exception
if not os.path.isfile('../games/{}'.format(sys.argv[1])):
    raise FileNotFoundError("err in '{}' - file '{}' doesn't seem to exist".format(sys.argv[0], sys.argv[1]))

#if all checks passed, emulator should be good to start
print("Starting '{}'!".format(game))
emulator = subprocess.check_output(["mednafen", "../games/{}".format(sys.argv[1])])