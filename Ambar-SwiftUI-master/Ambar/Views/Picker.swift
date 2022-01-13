//
//  ContentView.swift
//  Ambar
//
//  Created by Anagh Sharma on 12/11/19.
//  Copyright © 2019 Anagh Sharma. All rights reserved.
//

import SwiftUI
import AppKit



func chooseFramerFolder() -> String {
    let dialog = NSOpenPanel();

    dialog.title                   = "Choose a file| Our Code World";
    dialog.showsResizeIndicator    = true;
    dialog.showsHiddenFiles        = false;
    dialog.allowsMultipleSelection = false;
    dialog.canChooseDirectories = false;
    dialog.canChooseFiles = false;
    dialog.canChooseDirectories = true;

    if (dialog.runModal() ==  NSApplication.ModalResponse.OK) {
        let result = dialog.url // Pathname of the file

        if (result != nil) {
            let path: String = result!.path
            return path
            // path contains the file path e.g
            // /Users/ourcodeworld/Desktop/file.txt
        }
        
    }
    return "None"
}


struct ContentView3: View {
    @State private var title = "Choose Folder"
    var body: some View {
            Button(action: {
                self.title = chooseFramerFolder()
            })
            {
                Text(self.title)
                .font(.caption)
                .fontWeight(.semibold)
            }
            
    }
}


struct ContentView3_Previews: PreviewProvider {
    static var previews: some View {
        ContentView3()
    }
}
