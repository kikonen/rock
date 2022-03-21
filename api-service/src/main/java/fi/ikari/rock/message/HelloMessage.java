package fi.ikari.rock.message;

public class HelloMessage {
    private String name;

    HelloMessage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
