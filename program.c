#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

void* login(void* arg) {
    printf("Logging in...\n");
    sleep(2); 
    printf("Login successful!\n");
    return NULL;
}

void* upload(void* arg) {
    printf("Uploading file...\n");
    sleep(3);  
    printf("File uploaded successfully!\n");
    return NULL;
}

int main() {
    pthread_t thread1, thread2;

    pthread_create(&thread1, NULL, login, NULL);
    pthread_create(&thread2, NULL, upload, NULL);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    printf("All tasks done.\n");
    return 0;
}
