import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions (you can adjust to your third monitor resolution)
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Matrix Code Rain")

# Define colors
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)

# Set up font
font_size = 20
font = pygame.font.SysFont("ms mincho", font_size, bold=True)

# Characters to use in the rain
characters = [chr(i) for i in range(33, 127)]  # Printable ASCII characters

# Number of columns
columns = SCREEN_WIDTH // font_size

# Create drops for each column
drops = [random.randint(-20, 0) for _ in range(columns)]

clock = pygame.time.Clock()

def draw():
    screen.fill(BLACK)

    for i in range(len(drops)):
        char = random.choice(characters)
        char_render = font.render(char, True, GREEN)
        x = i * font_size
        y = drops[i] * font_size

        screen.blit(char_render, (x, y))

        # Reset drop to top randomly after it goes off screen
        if y > SCREEN_HEIGHT and random.random() > 0.975:
            drops[i] = 0
        else:
            drops[i] += 1

def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            # Exit on any key press
            elif event.type == pygame.KEYDOWN:
                running = False

        draw()
        pygame.display.flip()
        clock.tick(30)  # FPS

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
