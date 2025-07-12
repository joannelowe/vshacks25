#include "diagnosisBot.cpp"
#include <iostream>

using namespace std;

// User conversation with bot. User goes first.
// Ends when the user types the string "!done".
void converse(Diagnosis_bot* bot) {
    cout << "Conversation with "
		 << bot->name() << " (type !done to quit)\n\n";

    string user_reply;
    int turn = 1;
    while (user_reply != "!done"){
        cout << "User " << turn << "> ";
        getline(cin, user_reply);

		bot->give_to(user_reply);
		string bot_reply = bot->get_from();
		cout << bot->name() << " " << turn << "> " << bot_reply << "\n\n";

        turn++;
	} 

	cout << "User conversation with " << bot->name() << " ended\n";
}

int main()
{
    Diagnosis_bot doctor("Dr. Bobby");
    converse(&doctor);
}
