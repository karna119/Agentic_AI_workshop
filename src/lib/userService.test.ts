
import { describe, it, expect, vi } from 'vitest';
import { syncUserToDatabase } from './userService';

// Hoist mocks to allow access inside vi.mock
const mocks = vi.hoisted(() => {
    const mockUpsert = vi.fn();
    const mockFrom = vi.fn(() => ({
        upsert: mockUpsert
    }));
    return {
        mockFrom,
        mockUpsert
    };
});

vi.mock('./supabaseClient', () => ({
    supabase: {
        from: mocks.mockFrom
    }
}));

describe('userService', () => {
    it('syncUserToDatabase should call supabase.upsert with correct data', async () => {
        const mockUser = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890'
        };

        // Mock successful Supabase response
        mocks.mockUpsert.mockResolvedValue({
            data: { ...mockUser, id: 'test-id' },
            error: null
        });

        const result = await syncUserToDatabase(mockUser);

        // Verify function calls
        expect(mocks.mockFrom).toHaveBeenCalledWith('users');
        expect(mocks.mockUpsert).toHaveBeenCalledWith(
            expect.objectContaining({
                email: mockUser.email,
                name: mockUser.name,
                phone: mockUser.phone,
            }),
            { onConflict: 'email' }
        );

        // Verify result
        expect(result.success).toBe(true);
    });

    it('syncUserToDatabase should handle Supabase errors gracefully', async () => {
        const mockUser = {
            name: 'Error User',
            email: 'error@example.com',
            phone: '0000000000'
        };

        // Mock error response
        const mockError = { message: 'Database error' };
        mocks.mockUpsert.mockResolvedValue({
            data: null,
            error: mockError
        });

        const result = await syncUserToDatabase(mockUser);

        // Verify result indicates failure (captured in catch block)
        expect(result.success).toBe(false);
        expect(result.error).toEqual(mockError);
    });
});
