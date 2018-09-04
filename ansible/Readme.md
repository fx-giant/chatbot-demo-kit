## Simple Ansible scripts to get things started
These are some simple configuration to setup an end to end NON cluster deployment mode

Git clone and edit the host files to suit your needs

- Update the version 
- Configure the version
- Configure database credentials (replace all **myusername** and **mypassword**)
- Configure provided url


> Protip: you can have at least 2 servers. By adding more app server, you may want to setup a load balanacer and having each application url to talk to each other throught internal addresses. which require slight changes onto 04 yaml file.

> Protip: Adding storage serve no purpose but can be skip if you already have a premade storage.


> *Important*: Take important note on "Copy docker dialogflow-rnd.keyfile.json" at 01-setting-up.yaml. Configure the path to your desired folder. OR skip this entirely and perform manual login [not great thou]